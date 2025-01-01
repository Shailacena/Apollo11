package config

import (
	"sync"

	"github.com/spf13/viper"
)

type ServerConfig struct {
	Env         string      `mapstructure:"env"`
	HttpConfig  HttpConfig  `mapstructure:"http"`
	MysqlConfig MysqlConfig `mapstructure:"mysql"`
	RedisConfig RedisConfig `mapstructure:"redis"`
}

type HttpConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type MysqlConfig struct {
	Uri string `mapstructure:"uri"`
}

type RedisConfig struct {
	Host         string `mapstructure:"host"`
	Port         int    `mapstructure:"port"`
	DB           int    `mapstructure:"db"`
	ReadTimeout  string `mapstructure:"read_timeout"`
	WriteTimeout string `mapstructure:"write_timeout"`
}

var (
	conf *ServerConfig
	once sync.Once
)

func New(path string) *ServerConfig {
	once.Do(func() {
		vp := getConfig(path)
		err := vp.Unmarshal(&conf)
		if err != nil {
			panic(err)
		}
	})

	return conf
}

func getConfig(path string) *viper.Viper {
	conf := viper.New()
	conf.SetConfigFile(path)

	err := conf.ReadInConfig()
	if err != nil {
		panic(err)
	}

	return conf
}
